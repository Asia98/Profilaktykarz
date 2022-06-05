import smtplib
import ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from string import Template

import pandas as pd

from api import app
from api.config import BaseConfig
from api.models import get_checkups_within_range, Users


def read_template(filename):
    with open(filename, 'r', encoding='utf-8') as template_file:
        template_file_content = template_file.read()
    return Template(template_file_content)


def get_data_for_templates():
    with app.app_context():
        checkups_within_range = get_checkups_within_range()
        future_checkups = pd.DataFrame(checkups_within_range, columns=['user_id', 'checkup_id', 'medical_checkup',
                                                                       'cycle_years', 'last_checkup',
                                                                       'is_last_checkup_good', 'next_checkup_date'])
        future_checkups = future_checkups.loc[:, ['user_id', 'medical_checkup', 'next_checkup_date']]

        future_checkups_user_data = future_checkups.copy()
        future_checkups_user_data['user_email'] = future_checkups['user_id'].apply(lambda x: Users.get_by_id(x).email)
        future_checkups_user_data['user_name'] = future_checkups['user_id'].apply(lambda x: Users.get_by_id(x).username)
        future_checkups_user_data = future_checkups_user_data.loc[:,
                                    ['user_id', 'user_email', 'user_name']].drop_duplicates()

        grouped_users_checkups = {k: table for k, table in future_checkups.groupby(by='user_id')}
        return future_checkups_user_data, grouped_users_checkups


def main():
    user_data, checkups_data = get_data_for_templates()

    smtp_server = "smtp.poczta.onet.pl"
    port = 465
    sender_email = "profilaktykarz@op.pl"
    password = BaseConfig.EMAIL_PASSWORD

    message = MIMEMultipart("alternative")
    message["Subject"] = "Profilaktykarz: Przypomnienie o nadchodzących badaniach"
    message["From"] = sender_email

    # Create the plain-text and HTML version of your message
    text_template = read_template("mail_templates/txt_template.txt")
    html_template = read_template("mail_templates/html_template.html")

    # Create secure connection with server and send email
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
        server.login(sender_email, password)

        for index, row in user_data.iterrows():
            user_id = row['user_id']
            receiver_email = row['user_email']
            message["To"] = receiver_email

            checkup_string = checkups_data[user_id].to_string(columns=['medical_checkup', 'next_checkup_date'],
                                                              header=["Nazwa wizyty", "Sugerowany termin"], index=False)

            d = {"medical_checkup": "Nazwa wizyty", "next_checkup_date": "Sugerowany termin"}
            checkup_html = checkups_data[user_id].rename(columns=d)\
                .to_html(columns=['Nazwa wizyty', 'Sugerowany termin'], header=True, index=False)

            # Fill out template
            text = text_template.substitute(name=row['user_name'].capitalize(), checkups=checkup_string)
            html = html_template.substitute(name=row['user_name'].capitalize(), checkups=checkup_html)

            # Turn these into plain/html MIMEText objects
            part1 = MIMEText(text, "plain")
            part2 = MIMEText(html, "html")

            # Add HTML/plain-text parts to MIMEMultipart message
            # The email client will try to render the last part first
            message.attach(part1)
            message.attach(part2)

            server.sendmail(
                sender_email, receiver_email, message.as_string()
            )


if __name__ == '__main__':
    main()
