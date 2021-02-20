export interface HandlerProps {
  fails: boolean
}

export const run = async (event: HandlerProps) => {
  if (event.fails) {
    throw new Error('Failed on purpose')
  }

  return "Done"
}