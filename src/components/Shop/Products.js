import ProductItem from "./ProductItem";
import classes from "./Products.module.css";
const DUMMY_PRODUCTS = [
  {
    id: "p1",
    price: 6,
    title: "My First Book",
    description: "The first book I ever wrote",
  },
  {
    id: "p2",
    price: 8,
    title: "My First pen",
    description: "The first pen I ever bought",
  },
];
const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem
            id={product.id}
            key={product.id}
            price={product.price}
            title={product.title}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
