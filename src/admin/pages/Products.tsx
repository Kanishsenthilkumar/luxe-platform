import { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    stock: 0,
    image: null as File | null,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      setProducts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchProducts();
  }, []);

  const addProduct = async () => {
    if (!newProduct.name || !newProduct.price) return;

    let imageUrl = "";
    if (newProduct.image) {
      const storageRef = ref(storage, `products/${Date.now()}_${newProduct.image.name}`);
      await uploadBytes(storageRef, newProduct.image);
      imageUrl = await getDownloadURL(storageRef);
    }

    await addDoc(collection(db, "products"), {
      name: newProduct.name,
      description: newProduct.description,
      price: newProduct.price,
      category: newProduct.category,
      stock: newProduct.stock,
      imageUrl,
      createdAT: new Date().toISOString(),
    });

    setNewProduct({ name: "", description: "", price: 0, category: "", stock: 0, image: null });
    window.location.reload();
  };

  const deleteProduct = async (id: string) => {
    await deleteDoc(doc(db, "products", id));
    window.location.reload();
  };

  return (
    <div>
      <h1>Manage Products</h1>

      <input
        type="text"
        placeholder="Name"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newProduct.description}
        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: +e.target.value })}
      />
      <input
        type="text"
        placeholder="Category"
        value={newProduct.category}
        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
      />
      <input
        type="number"
        placeholder="Stock"
        value={newProduct.stock}
        onChange={(e) => setNewProduct({ ...newProduct, stock: +e.target.value })}
      />

      <input
        type="file"
        onChange={(e) =>
          setNewProduct({ ...newProduct, image: e.target.files ? e.target.files[0] : null })
        }
      />

      <button onClick={addProduct}>Add Product</button>

      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.imageUrl && <img src={p.imageUrl} alt={p.name} width="100" />}
            {p.name} - ₹{p.price} ({p.stock} left)
            <button onClick={() => deleteProduct(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
  