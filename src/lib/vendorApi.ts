import { API_BASE_URL, getAuthToken } from './apiConfig'

export interface VendorDto {
  vendorId: string
  name: string
  contactName?: string
  email?: string
  phone?: string
  specialty?: string
  status?: string
}

export interface CreateVendorRequestDto {
  name: string
  contactName?: string
  email?: string
  phone?: string
  specialty?: string
}

export interface RepresentativeDto {
  representativeId: string
  vendorId: string
  firstName: string
  lastName: string
  email?: string
  phone?: string
  title?: string
}

export interface CreateRepresentativeRequestDto {
  firstName: string
  lastName: string
  email?: string
  phone?: string
  title?: string
}

function getHeaders(): HeadersInit {
  const token = getAuthToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return headers
}

/**
 * GET /api/vendors
 */
export async function fetchVendorsApi(): Promise<VendorDto[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/vendors`, {
      headers: getHeaders(),
    })
    if (!res.ok) {
      console.warn(`[vendorApi] GET /api/vendors returned HTTP ${res.status}`)
      return []
    }
    const data = await res.json()
    return Array.isArray(data) ? data : []
  } catch (err) {
    console.warn('[vendorApi] GET /api/vendors failed:', err)
    return []
  }
}

/**
 * POST /api/vendors
 */
export async function createVendorApi(req: CreateVendorRequestDto): Promise<VendorDto | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/vendors`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(req),
    })
    if (!res.ok) {
      console.warn(`[vendorApi] POST /api/vendors returned HTTP ${res.status}`)
      return null
    }
    return await res.json()
  } catch (err) {
    console.warn('[vendorApi] POST /api/vendors failed:', err)
    return null
  }
}

/**
 * POST /api/vendors/{vendorId}/representatives
 */
export async function createVendorRepresentativeApi(
  vendorId: string,
  req: CreateRepresentativeRequestDto,
): Promise<RepresentativeDto | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/vendors/${encodeURIComponent(vendorId)}/representatives`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(req),
    })
    if (!res.ok) {
      console.warn(`[vendorApi] POST /api/vendors/${vendorId}/representatives returned HTTP ${res.status}`)
      return null
    }
    return await res.json()
  } catch (err) {
    console.warn(`[vendorApi] POST /api/vendors/${vendorId}/representatives failed:`, err)
    return null
  }
}
