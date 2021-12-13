import type { FC } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Text = styled.h1`
  color: white;
  text-shadow: 2px 2px #000000;
`

const Custom404: FC = () => {
  return (
    <Container>
      <Text>404 - Page Not Found</Text>
    </Container>
  )
}

export default Custom404
