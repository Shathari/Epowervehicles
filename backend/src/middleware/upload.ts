import multer from 'multer'
import path from 'node:path'
import fs from 'node:fs'
import crypto from 'node:crypto'
import { AppError } from '../utils/AppError.ts'

const UPLOADS_DIR = path.join(process.cwd(), 'uploads')
fs.mkdirSync(UPLOADS_DIR, { recursive: true })

const ALLOWED_MIME_TYPES = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'])

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    cb(null, `${crypto.randomUUID()}${ext}`)
  },
})

export const uploadImage = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      cb(AppError.badRequest('Only PNG, JPEG, WebP, and SVG images are allowed.'))
      return
    }
    cb(null, true)
  },
})

// Dedicated multer instance for the dashboard sync upload endpoint (POST /api/public/admin/uploads)
// — a wider format allow-list (adds JPG/GIF) and a larger size cap than the product upload above,
// kept separate so it can't change behavior for existing callers of `uploadImage`.
const PUBLIC_ADMIN_ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
])

const PUBLIC_ADMIN_MIME_EXTENSIONS: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
}

const publicAdminStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, file, cb) => {
    const ext =
      PUBLIC_ADMIN_MIME_EXTENSIONS[file.mimetype] ?? path.extname(file.originalname).toLowerCase()
    cb(null, `${crypto.randomUUID()}${ext}`)
  },
})

export const uploadPublicImage = multer({
  storage: publicAdminStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!PUBLIC_ADMIN_ALLOWED_MIME_TYPES.has(file.mimetype)) {
      cb(AppError.badRequest('Only JPG, JPEG, PNG, WebP, and GIF images are allowed.'))
      return
    }
    cb(null, true)
  },
})

export { UPLOADS_DIR }
