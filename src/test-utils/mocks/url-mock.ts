import { vi } from 'vitest';

export const BlobMock = vi.fn();
export const URLMock = {
  createObjectURL: vi.fn(),
  revokeObjectURL: vi.fn(),
};
vi.stubGlobal('URL', URLMock);
vi.stubGlobal('Blob', BlobMock);
