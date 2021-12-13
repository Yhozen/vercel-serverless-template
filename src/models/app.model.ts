import { NextPage } from 'next'

export type ExtendedPage<PassedProps = Record<string, never>> =
  NextPage<PassedProps> & {
    /**
     *  Layout
     */
    getLayout?: (page: JSX.Element) => JSX.Element
    /**
     * - This is the name of the page
     */
    pageName: string
  }
