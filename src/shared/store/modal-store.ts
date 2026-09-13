import { create } from 'zustand';
import type { ModalType } from '@/src/shared/components/modals/types';

type ModalState = {
  activeModal: ModalType | null;
  data: unknown;
  openModal: (modal: ModalType, data?: unknown) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  activeModal: null,
  data: null,
  openModal: (activeModal, data = null) => set({ activeModal, data }),
  closeModal: () => set({ activeModal: null, data: null }),
}));
