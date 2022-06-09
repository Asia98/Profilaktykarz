import React from 'react'

import {Box, Container, Divider, Heading, Stack} from '@chakra-ui/react'

import PreventionViewItem from './item'
import {PreventionItem} from './types'

const items: PreventionItem[] = [
  {
    description:
      'Szczegółowe materiały informacyjne o przedmiocie postępowania w sprawie zawarcia umów o udzielanie świadczeń opieki zdrowotnej',
    link: 'https://www.nfz.gov.pl/download/gfx/nfz/pl/defaultaktualnosci/293/1308/1/z6z_2004.pdf',
    name: 'Wykaz specjalizacji do badań',
  },
  {
    description: 'Wygodna wyszukiwarka specjalistów zajmujących się programami profilaktycznymi.',
    link: 'https://gsl.nfz.gov.pl/GSL/GSL/ProgramyProfilaktyczne',
    name: 'Wyszukiwarka specjalistów',
  },
  {
    description: 'Seria praktycznych wskazówek, które pomogą Ci żyć zdrowo.',
    link: 'https://pacjent.gov.pl/profilaktyka',
    name: 'Wskazówki zdrowego trybu życia',
  },
  {
    description:
      'Masz ukończone 40 lat? Skorzystaj z pakietu badań profilaktycznych w ramach programu Profilaktyka 40 PLUS',
    link: 'https://pacjent.gov.pl/aktualnosc/jakie-badania-w-programie-profilaktyka-40-plus',
    name: 'Profilaktyka 40 PLUS',
  },
  {
    description:
      'Znajdź gdzie i kiedy najszybciej uzyskasz pomoc lekarza, ile osób oczekuje na leczenie w wybranej przez Ciebie placówce oraz czy w szpitalu lub poradni znajdują się udogodnienia dla pacjentów, takie jak: parking, podjazd dla wózków, winda czy specjalnie dostosowana łazienka dla osób niepełnosprawnych.',
    link: 'https://pacjent.gov.pl/terminy-leczenia',
    name: 'Terminy leczenia',
  },
]

const PreventionView = () => {
  return (
    <Container maxW="container.xl">
      <Heading py="5">Przydatne linki i informacje</Heading>
      <Box py="5">
        {items.map((item, i) => (
          <>
            <PreventionViewItem key={i} item={item} />
            {i === items.length - 1 ? null : <Divider />}
          </>
        ))}
      </Box>
    </Container>
  )
}

export default PreventionView
