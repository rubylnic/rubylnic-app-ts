
import { useParams } from 'react-router-dom';
import UserInfo from 'src/features/Users/components/UserInfo';
import Layout from 'src/layout/Layout';

function UserPage() {
    const { id } = useParams();
    return (
        <Layout title="User">
            <UserInfo id={id} />
        </Layout>
    )
}

export default UserPage