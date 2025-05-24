'use client'

import React from 'react'
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  useDisclosure,
  Flex,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { sidebarLinks } from '@/config/navigation'
import Link from 'next/link'

export const Sidebar = ({ children }: { children: React.ReactNode }) => {
  // モバイル表示のときのみDrawerを使用
  const isMobile = useBreakpointValue({ base: true, md: false })
  const { open, onOpen, onClose } = useDisclosure()

  // サイドバーの幅を設定
  const sidebarWidth = '250px'

  // サイドバーのコンテンツ
  const SidebarContent = () => (
    <Flex direction="column" gap="2">
      {sidebarLinks.map((link) => (
        <Link href={link.href || '#'} key={link.name} style={{ width: '100%' }}>
          <Button
            width="full"
            justifyContent="flex-start"
            variant="ghost"
            onClick={isMobile ? onClose : undefined}
          >
            <Flex align="center">
              <Box mr="2">{React.createElement(link.icon)}</Box>
              {link.name}
            </Flex>
          </Button>
        </Link>
      ))}
    </Flex>
  )

  return (
    <Flex minH="100vh">
      {/* モバイル表示のときのみボタンを表示 */}
      {isMobile && (
        <Button
          aria-label="メニューを開く"
          position="fixed"
          top="4"
          left="4"
          zIndex="overlay"
          onClick={onOpen}
        >
          Menu
        </Button>
      )}

      {/* モバイル表示: Drawer / デスクトップ表示: 固定サイドバー */}
      {isMobile ? (
        <Drawer.Root placement="start" open={open}>
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
            <DrawerBody>
              <SidebarContent />
            </DrawerBody>
          </DrawerContent>
        </Drawer.Root>
      ) : (
        <Box
          width={sidebarWidth}
          borderRightWidth="1px"
          height="100vh"
          position="fixed"
          overflowY="auto"
          py={4}
          px={3}
        >
          <Box mb={6} px={2}>
            <Text fontSize="xl" fontWeight="bold">
              CloudRunSample
            </Text>
          </Box>
          <SidebarContent />
        </Box>
      )}

      {/* コンテンツ領域 - デスクトップ表示では左マージンをサイドバーの幅に設定 */}
      <Box
        flex="1"
        ml={{ base: 0, md: sidebarWidth }}
        p={4}
        transition="margin 0.3s"
        width={{ base: '100%', md: `calc(100% - ${sidebarWidth})` }}
      >
        {children}
      </Box>
    </Flex>
  )
}
