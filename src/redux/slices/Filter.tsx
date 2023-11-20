import React, { useState } from 'react'

import { useAppSelector, useAppDispatch } from '@/redux/hooks'



export function Counter() {
  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  // omit rendering logic
}