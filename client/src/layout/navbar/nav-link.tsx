import React from 'react'

import {Link, LinkProps, useColorModeValue} from '@chakra-ui/react'
import {Link as RouterLink} from 'react-router-dom'

export type NavLinkProps = LinkProps & {
  absolutePath?: string
  label: string
}

const NavLink = ({absolutePath, label, ...props}: NavLinkProps) => (
  <Link
    as={RouterLink}
    px={2}
    py={1}
    rounded="md"
    _hover={{
      bg: useColorModeValue('gray.200', 'gray.700'),
      textDecoration: 'none',
    }}
    to={absolutePath}
    {...props}
  >
    {label}
  </Link>
)

export default NavLink
