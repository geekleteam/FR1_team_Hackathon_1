import { createFileRoute, redirect } from '@tanstack/react-router';
import { nanoid } from 'nanoid';

export const Route = createFileRoute('/_authenticated/new')({
  beforeLoad: () => {
    throw redirect({
      to: '/board/$board',
      params: {
        board: nanoid(),
      },
    });
  },
});
