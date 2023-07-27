import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
// import { IPost } from '@/components/interfaces/post.interface';

function ProductCard({ brand, category, description, discountPercentage, id, images, price, rating, stock, thumbnail, title }) {
    const handleAddToCart = () => {
        console.log('add to cart')
    }

    return (
        <Grid item xs={6} md={4} lg={3}>
            <Card sx={{ minWidth: 275, position: 'relative', height: "400px" }}>
                <CardContent sx={{ pb: "10px" }}>
                    <CardMedia
                        component="img"
                        height="194"
                        image={thumbnail}
                        alt={title}
                        sx={{ mb: "15px" }}
                    />
                    <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                        {brand}
                    </Typography>
                    <Typography sx={{ fontSize: 30, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }} variant="h5">
                        {title}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {price}$
                    </Typography>
                    {/* <Typography variant="body2">
                        {description}
                    </Typography> */}
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={handleAddToCart}>Add to cart</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default ProductCard