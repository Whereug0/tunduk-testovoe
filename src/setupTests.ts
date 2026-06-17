import { TextDecoder, TextEncoder } from 'node:util'
import '@testing-library/jest-dom'

if (typeof global.TextEncoder === 'undefined') {
  // jsdom's test environment doesn't provide these; react-router needs them.
  global.TextEncoder = TextEncoder as typeof global.TextEncoder
  global.TextDecoder = TextDecoder as typeof global.TextDecoder
}
