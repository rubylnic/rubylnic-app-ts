import { FC, PropsWithChildren } from 'react';
import { IMeta } from './meta.interface';
import Head from 'next/head';

// по хорошему надо вынести в утилиты
const getTitle = (title: string) => `${title} | Rubylnic Catalog`

const Meta: FC<PropsWithChildren<IMeta>> = ({ title, description, children }) => {
    return (
        <>
            <Head>
                <title>{getTitle(title)}</title>
                {description ? <>
                    <meta typeof='description' content={description} />
                    <meta name='og:title' content={getTitle(title)} />
                    <meta typeof='og:description' content={description} />
                </> : <>
                    <meta name='robots' content='noindex nofollow' /></>}
            </Head>
            {children}
        </>
    )
}

export default Meta