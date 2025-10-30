import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { login } from '../lib/api'

export const useLogin = () => {

    const queryClient = useQueryClient()

   const {mutate , isPending , error} = useMutation({
    mutationFn:login,
    onSuccess: ()=> queryClient.invalidateQueries({queryKey: ["authUser"]})
  })

  return {error , isPending , loginMutation : mutate}
}
