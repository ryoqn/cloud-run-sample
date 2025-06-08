'use client'

import React from 'react'
import {
  Box,
  Button,
  useDisclosure,
  Flex,
  Text,
  useBreakpointValue,
  Separator,
  Stack,
  Portal,
} from '@chakra-ui/react'
import { Avatar } from '@chakra-ui/react/avatar'
import { Drawer } from '@chakra-ui/react/drawer'
import { getNavigationLinks } from '@/config/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { FiLogOut } from 'react-icons/fi'
import { useRouter } from 'next/navigation'

export const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const { open, onOpen, onClose } = useDisclosure()
  const { user, logout, loading } = useAuth()
  const router = useRouter()
  
  const sidebarWidth = '250px'
  
  // 認証状態に応じたリンクを取得
  const navigationLinks = getNavigationLinks(!!user)

  // ログアウト処理
  const handleLogout = async () => {
    try {
      await logout()
      router.push('/signin')
      if (isMobile) onClose()
    } catch (error) {
      console.error('ログアウトエラー:', error)
    }
  }

  // ユーザー情報セクション
  const UserSection = () => {
    if (!user) return null
    
    return (
      <Stack gap={3} p={4} borderRadius="md" bg="gray.50" _dark={{ bg: 'gray.700' }} align="center">
        <Avatar.Root size="sm">
          <Avatar.Image 
            src={user.photoURL || ''} 
            alt={user.displayName || user.email || ''}
          />
          <Avatar.Fallback>
            {(user.displayName || user.email || '').charAt(0).toUpperCase()}
          </Avatar.Fallback>
        </Avatar.Root>
        <Text fontSize="sm" fontWeight="medium" textAlign="center" lineClamp={1}>
          {user.displayName || user.email}
        </Text>
      </Stack>
    )
  }

  const SidebarContent = () => (
    <Flex direction="column" height="full">
      {/* ユーザー情報 */}
      {user && (
        <>
          <UserSection />
          <Separator my={4} />
        </>
      )}
      
      {/* ナビゲーションリンク */}
      <Flex direction="column" gap="2" flex="1">
        {navigationLinks.map((link) => (
          <Link href={link.href} key={link.name} style={{ width: '100%' }}>
            <Button
              width="full"
              justifyContent="flex-start"
              variant="ghost"
              onClick={isMobile ? onClose : undefined}
              disabled={loading}
            >
              <Flex align="center">
                <Box mr="2">{React.createElement(link.icon)}</Box>
                {link.name}
              </Flex>
            </Button>
          </Link>
        ))}
      </Flex>
      
      {/* ログアウトボタン */}
      {user && (
        <>
          <Separator my={4} />
          <Button
            width="full"
            justifyContent="flex-start"
            variant="ghost"
            colorScheme="red"
            onClick={handleLogout}
            loading={loading}
          >
            <Flex align="center">
              <Box mr="2"><FiLogOut /></Box>
              ログアウト
            </Flex>
          </Button>
        </>
      )}
    </Flex>
  )

  return (
    <Flex minH="100vh">
      {/* モバイルメニューボタン */}
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

      {/* サイドバー本体 */}
      {isMobile ? (
        <Drawer.Root placement="start" open={open} onOpenChange={(e) => e.open ? onOpen() : onClose()}>
          <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content>
                <Drawer.Header borderBottomWidth="1px">
                  <Drawer.Title>Menu</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body p={0}>
                  <SidebarContent />
                </Drawer.Body>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
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
          display="flex"
          flexDirection="column"
        >
          <Box mb={6} px={2}>
            <Text fontSize="xl" fontWeight="bold">
              CloudRunSample
            </Text>
          </Box>
          <SidebarContent />
        </Box>
      )}

      {/* メインコンテンツ */}
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