import { API_BASE_URL, getAuthToken } from './apiConfig'

export interface DeficitQueueItemDto {
  id: string
  eventId?: string | null
  eventName?: string | null
  itemCategory?: string | null
  itemName: string
  quantityNeeded: number
  urgencyLevel?: string | null
  status: string
  createdAt?: string
}

export interface CreateDeficitItemRequestDto {
  eventId?: string
  itemCategory?: string
  itemName: string
  quantityNeeded: number
  urgencyLevel?: string
}

export interface UpdateDeficitStatusRequestDto {
  status: string
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
 * GET /api/deficit-queue
 */
export async function fetchDeficitQueueApi(): Promise<DeficitQueueItemDto[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/deficit-queue`, {
      headers: getHeaders(),
    })
    if (!res.ok) {
      console.warn(`[deficitApi] GET /api/deficit-queue returned HTTP ${res.status}`)
      return []
    }
    const data = await res.json()
    return Array.isArray(data) ? data : []
  } catch (err) {
    console.warn('[deficitApi] GET /api/deficit-queue failed:', err)
    return []
  }
}

/**
 * POST /api/deficit-queue
 */
export async function createDeficitItemApi(req: CreateDeficitItemRequestDto): Promise<DeficitQueueItemDto | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/deficit-queue`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(req),
    })
    if (!res.ok) {
      console.warn(`[deficitApi] POST /api/deficit-queue returned HTTP ${res.status}`)
      return null
    }
    return await res.json()
  } catch (err) {
    console.warn('[deficitApi] POST /api/deficit-queue failed:', err)
    return null
  }
}

/**
 * PATCH /api/deficit-queue/{id}/status
 */
export async function updateDeficitStatusApi(id: string, status: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/deficit-queue/${encodeURIComponent(id)}/status`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({ status }),
    })
    return res.ok || res.status === 204
  } catch (err) {
    console.warn(`[deficitApi] PATCH /api/deficit-queue/${id}/status failed:`, err)
    return false
  }
}
