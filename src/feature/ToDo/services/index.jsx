import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/index.jsx';
import { httpClient } from './axios.jsx';
import { toast } from 'react-toastify';

const createToDo = (data) => {
  return httpClient.post(api.create, data);
};

const useCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createToDo,
    onSuccess: () => {
      queryClient.invalidateQueries([api.getAll]);
      toast.success('Task added successfully!!');
    },
  });
};

const getAllTodos = () => {
  return httpClient.get(api.getAll);
};

const useGetAllTodos = () => {
  return useQuery({
    queryKey: [api.getAll],
    queryFn: getAllTodos,
  });
};

const deleteId = (id) => {
  return httpClient.delete(api.getById.replace('{id}', `${id}`));
};

const useDeleteById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteId,
    onSuccess: () => {
      queryClient.invalidateQueries([api.getAll]);
      toast.warning('Task deleted successfully!!');
    },
  });
};

const deleteAllTodos = () => {
  return httpClient.delete(api.deleteAll);
};

const useDeleteAllTodos = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAllTodos,
    onSuccess: () => {
      queryClient.invalidateQueries([api.getAll]);
      toast.warning('Task edited successfully!!');
    },
  });
};

const getEdit = ({ reqBody }) => {
  return httpClient.put(api.update, reqBody);
};

const useGetEdit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: getEdit,
    onSuccess: () => {
      queryClient.invalidateQueries([api.getAll]);
      toast.success('Task edited successfully!!');
    },
  });
};

export {
  useDeleteAllTodos,
  useDeleteById,
  useGetAllTodos,
  useCreate,
  useGetEdit,
};
