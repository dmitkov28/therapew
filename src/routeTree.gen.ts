/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ProtectedImport } from './routes/_protected'
import { Route as IndexImport } from './routes/index'
import { Route as ProtectedSpeechToTextIndexImport } from './routes/_protected/speech-to-text/index'
import { Route as ProtectedClientsIndexImport } from './routes/_protected/clients/index'
import { Route as ProtectedClientsAddImport } from './routes/_protected/clients/add'
import { Route as ProtectedSessionsSessionIdIndexImport } from './routes/_protected/sessions/$sessionId/index'
import { Route as ProtectedClientsClientIdIndexImport } from './routes/_protected/clients/$clientId/index'
import { Route as ProtectedClientsClientIdEditIndexImport } from './routes/_protected/clients/$clientId/edit/index'

// Create/Update Routes

const ProtectedRoute = ProtectedImport.update({
  id: '/_protected',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ProtectedSpeechToTextIndexRoute = ProtectedSpeechToTextIndexImport.update(
  {
    path: '/speech-to-text/',
    getParentRoute: () => ProtectedRoute,
  } as any,
)

const ProtectedClientsIndexRoute = ProtectedClientsIndexImport.update({
  path: '/clients/',
  getParentRoute: () => ProtectedRoute,
} as any)

const ProtectedClientsAddRoute = ProtectedClientsAddImport.update({
  path: '/clients/add',
  getParentRoute: () => ProtectedRoute,
} as any)

const ProtectedSessionsSessionIdIndexRoute =
  ProtectedSessionsSessionIdIndexImport.update({
    path: '/sessions/$sessionId/',
    getParentRoute: () => ProtectedRoute,
  } as any)

const ProtectedClientsClientIdIndexRoute =
  ProtectedClientsClientIdIndexImport.update({
    path: '/clients/$clientId/',
    getParentRoute: () => ProtectedRoute,
  } as any)

const ProtectedClientsClientIdEditIndexRoute =
  ProtectedClientsClientIdEditIndexImport.update({
    path: '/clients/$clientId/edit/',
    getParentRoute: () => ProtectedRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_protected': {
      preLoaderRoute: typeof ProtectedImport
      parentRoute: typeof rootRoute
    }
    '/_protected/clients/add': {
      preLoaderRoute: typeof ProtectedClientsAddImport
      parentRoute: typeof ProtectedImport
    }
    '/_protected/clients/': {
      preLoaderRoute: typeof ProtectedClientsIndexImport
      parentRoute: typeof ProtectedImport
    }
    '/_protected/speech-to-text/': {
      preLoaderRoute: typeof ProtectedSpeechToTextIndexImport
      parentRoute: typeof ProtectedImport
    }
    '/_protected/clients/$clientId/': {
      preLoaderRoute: typeof ProtectedClientsClientIdIndexImport
      parentRoute: typeof ProtectedImport
    }
    '/_protected/sessions/$sessionId/': {
      preLoaderRoute: typeof ProtectedSessionsSessionIdIndexImport
      parentRoute: typeof ProtectedImport
    }
    '/_protected/clients/$clientId/edit/': {
      preLoaderRoute: typeof ProtectedClientsClientIdEditIndexImport
      parentRoute: typeof ProtectedImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  ProtectedRoute.addChildren([
    ProtectedClientsAddRoute,
    ProtectedClientsIndexRoute,
    ProtectedSpeechToTextIndexRoute,
    ProtectedClientsClientIdIndexRoute,
    ProtectedSessionsSessionIdIndexRoute,
    ProtectedClientsClientIdEditIndexRoute,
  ]),
])

/* prettier-ignore-end */
