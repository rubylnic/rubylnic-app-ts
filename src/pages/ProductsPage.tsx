import { useSearchParams } from 'react-router-dom'
import Filter from "src/features/Products/components/Filter/Filter"
import Products from "src/features/Products/components/Products"
import Layout from 'src/layout/Layout'

type Props = {}

function ProductsPage({ }: Props) {
    const [searchParams] = useSearchParams();
    const query = Object.fromEntries([...searchParams]);
    const search = !!searchParams.get('search') ? searchParams.get('search') : '';
    const category = !!searchParams.get('category') ? searchParams.get('category') : '';

    return (
        <Layout title="Products">
            <Filter />
            <Products search={search} category={category} query={query} />
        </Layout>

    )
}

export default ProductsPage