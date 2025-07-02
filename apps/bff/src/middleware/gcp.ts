import express from 'express'
import * as gcpMetadata from 'gcp-metadata'
import { apiServerUrl } from '../app'
import { AuthenticatedRequest } from './firebase-auth'

// AuthenticatedRequestを拡張してGCPトークンを含める
export interface AuthenticatedRequestWithToken extends AuthenticatedRequest {
  gcpToken?: string
}

export const attachGcpToken = async (
  req: AuthenticatedRequestWithToken,
  res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  try {
    const token = await getGcpMetadataToken()
    req.gcpToken = token
    next()
  } catch (error) {
    console.error('Failed to get GCP token:', error)
    res.status(503).json({
      error: 'Service Unavailable',
      message: 'Failed to authenticate with backend service',
      timestamp: new Date().toISOString(),
    })
  }
}

/**
 * GCPのメタデータサーバーからトークンを取得
 */
export async function getGcpMetadataToken(): Promise<string> {
  if (!gcpMetadata.isAvailable()) {
    return 'dummy-token-for-local-development'
  }

  return await gcpMetadata.instance<string>({
    property: 'service-accounts/default/identity',
    params: { audience: apiServerUrl },
  })
}
