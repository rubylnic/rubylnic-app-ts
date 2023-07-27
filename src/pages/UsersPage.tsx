import React from 'react'
import UsersInfo from 'src/features/Users/components/UsersInfo'
import Layout from 'src/layout/Layout'

type Props = {}

function UsersPage({ }: Props) {
    return (
        <Layout title="Users">
            <UsersInfo />
        </Layout>
    )
}

export default UsersPage