import React from 'react'
import Layout from 'src/layout/Layout'
import MainForm from 'src/features/Form/components/MainForm'

type Props = {}

function CreateUserPage({ }: Props) {
    return (
        <Layout title="Create user">
            <MainForm />
        </Layout>
    )
}

export default CreateUserPage