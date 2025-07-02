'use client'

import { useSample } from '@/lib/api/hooks/useSample'
import { Box, Container, Heading, Stack, Text } from '@chakra-ui/react'

export default function Sample() {
  const { data, loading, error } = useSample()

  if (loading) {
    return <Text>Loading...</Text>
  }

  if (error) {
    return <Text>Error: {error.message}</Text>
  }

  if (!data) {
    return <Text>No data found</Text>
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Stack>
        <Heading as="h1" size="xl">
          Sample Data
        </Heading>
        <Box p={4} borderWidth={1} borderRadius="md">
          <Text fontSize="lg">{JSON.stringify(data, null, 2)}</Text>
        </Box>
      </Stack>
    </Container>
  )
}
