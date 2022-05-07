import React from 'react'

import {HamburgerIcon, CloseIcon, MoonIcon, SunIcon} from '@chakra-ui/icons'
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  IconButton,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import {Link as RouterLink} from 'react-router-dom'

import NavLink, {NavLinkProps} from './nav-link'

const buttonDisplay = {md: 'none'}
const navbarLinksDisplay = {base: 'none', md: 'flex'}
const dropdownMenuDisplay = {md: 'none'}

const Navbar = () => {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const {colorMode, toggleColorMode} = useColorMode()

  const links: NavLinkProps[] = React.useMemo(
    () => [
      {
        absolutePath: '/calendar',
        label: 'Kalendarz',
      },
    ],
    []
  )

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')}>
      <Container maxW="container.xl">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={buttonDisplay}
            onClick={isOpen ? onClose : onOpen}
          />
          <Box as={RouterLink} to="/">
            <b>Profilaktykarz</b>
          </Box>
          <HStack spacing={8} alignItems="center">
            <HStack as="nav" spacing={4} display={navbarLinksDisplay}>
              {links.map((props, i) => (
                <NavLink key={i} {...props} />
              ))}
            </HStack>
            {colorMode === 'light' ? (
              <IconButton
                aria-label="Switch to dark mode"
                icon={<MoonIcon />}
                onClick={toggleColorMode}
                bg="none"
              />
            ) : (
              <IconButton
                aria-label="Switch to light mode"
                icon={<SunIcon />}
                onClick={toggleColorMode}
                bg="none"
              />
            )}
            <Button
              variant="outline"
              borderColor="teal"
              color="teal.600"
              borderWidth="2px"
              p={2}
              rounded="md"
              _hover={{
                bg: useColorModeValue('gray.200', 'gray.700'),
                textDecoration: 'none',
              }}
              fontSize="sm"
              cursor="pointer"
            >
              {localStorage.getItem('profilaktykarzUser') ? 'Wyloguj' : 'Zaloguj'}
            </Button>
          </HStack>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={dropdownMenuDisplay}>
            <Stack as="nav" spacing={4}>
              {links.map((props, i) => (
                <NavLink key={i} {...props} />
              ))}
            </Stack>
          </Box>
        ) : null}
      </Container>
    </Box>
  )
}

export default Navbar
