<Flex
  position='fixed'
  maxWidth='100vw'
  top='0'
  left='0'
  right='0'
  alignItems='center'
  justifyContent='space-between'
  padding='1rem'
  backgroundColor={
    isScrolled ? 'rgba(150, 150, 150, 0.9)' : 'rgba(10, 150, 130, 0.9)'
  }
  backdropFilter={isScrolled ? 'blur(10px)' : 'none'}
  transition='background-color 0.3s ease-in-out, backdrop-filter 0.3s ease-in-out'
  zIndex={100}
>
  <Box>
    <Image
      borderRadius='full'
      boxSize='60px'
      src='https://bit.ly/dan-abramov'
      alt='Dan Abramov'
    />
  </Box>
  <Stack
    in={!isMenuOpen}
    direction={['column', 'row']}
    spacing='24px'
    display={{ base: 'none', md: 'flex', lg: 'flex' }}
  >
    <Button colorScheme='facebook' href='#'>
      Home
    </Button>
    <Button colorScheme='facebook' href='#'>
      About
    </Button>
    <ProductButton />
    <Button as={AddIcon}></Button>
  </Stack>
  <IconButton
    aria-label='Hamburger Menu'
    icon={<HamburgerIcon />}
    display={['block', 'block', 'none']}
    onClick={toggleMenu}
  />
  {/* Mobile Menu */}
  <Collapse in={isMenuOpen} animateOpacity>
    <Box
      position='fixed'
      top='60px'
      right='0'
      width='100%'
      backgroundColor='rgba(255, 255, 255, 0.9)'
      padding='1rem'
      zIndex={99}
    >
      <VStack spacing='1rem'>
        <Button colorScheme='facebook' href='#'>
          Home
        </Button>
        <Button colorScheme='facebook' href='#'>
          About
        </Button>
        <ProductButton />
      </VStack>
    </Box>
  </Collapse>
</Flex>
