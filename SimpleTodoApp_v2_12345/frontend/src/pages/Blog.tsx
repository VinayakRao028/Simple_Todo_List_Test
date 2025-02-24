import React from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';

const Blog: React.FC = () => {
    return (
        <div className="blog-page">
            <header className="header">
                <Link to="/">
                    <img src="/images/swethlogopng5.png" className="logo" alt="Logo" />
                </Link>
                <nav>
                    <ul className="navbar">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/shop">Shop</Link></li>
                        <li><Link to="/blog" className="active">Blog</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li className="lg-bag"><Link to="/cart"><i className="far fa-shopping-bag"></i></Link></li>
                    </ul>
                </nav>
                <div className="mobile">
                    <Link to="/cart"><i className="far fa-shopping-bag"></i></Link>
                    <i className="fas fa-outdent" id="bar"></i>
                </div>
            </header>

            <section className="page-header blog-header">
                <h2>#readmore</h2>
                <p>Read all case studies about our products</p>
            </section>

            <section className="blog">
                {[
                    {
                        img: '/images/blog/b1.jpg',
                        title: 'The cotton-Jersey Zip-Up Hoodies',
                        content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi libero accusamus fuga alias repellendus voluptatibus, velit odio repellat explicabo voluptatum.',
                        date: '13/01'
                    },
                    {
                        img: '/images/blog/b2.jpg',
                        title: 'The cotton-Jersey Zip-Up Hoodies',
                        content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi libero accusamus fuga alias repellendus voluptatibus, velit odio repellat explicabo voluptatum.',
                        date: '13/01'
                    },
                    {
                        img: '/images/blog/b3.jpg',
                        title: 'How to style a Quiff',
                        content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi libero accusamus fuga alias repellendus voluptatibus, velit odio repellat explicabo voluptatum.',
                        date: '20/08'
                    },
                    {
                        img: '/images/blog/b4.jpg',
                        title: 'Must-Have skater girl items',
                        content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi libero accusamus fuga alias repellendus voluptatibus, velit odio repellat explicabo voluptatum.',
                        date: '15/10'
                    },
                    {
                        img: '/images/blog/b5.jpg',
                        title: 'Runway inspired trends',
                        content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi libero accusamus fuga alias repellendus voluptatibus, velit odio repellat explicabo voluptatum.',
                        date: '16/01'
                    },
                    {
                        img: '/images/blog/b6.jpg',
                        title: 'AW20 Menswear Trends',
                        content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi libero accusamus fuga alias repellendus voluptatibus, velit odio repellat explicabo voluptatum.',
                        date: '10/03'
                    }
                ].map((blog, index) => (
                    <div className="blog-box" key={index}>
                        <div className="blog-img">
                            <img src={blog.img} alt={blog.title} />
                        </div>
                        <div className="blog-details">
                            <h4>{blog.title}</h4>
                            <p>{blog.content}</p>
                            <a href="#">CONTINUE READING</a>
                        </div>
                        <h1>{blog.date}</h1>
                    </div>
                ))}
            </section>

            <section className="pagination">
                <a href="#">1</a>
                <a href="#">2</a>
                <a href="#"><i className="fal fa-long-arrow-alt-right"></i></a>
            </section>

            <section className="newsletter">
                <div className="newstext">
                    <h4>Sign Up For Newsletter</h4>
                    <p>Get Email updates about our latest shop and <span>special offers</span></p>
                </div>
                <div className="form">
                    <input type="text" placeholder="your email address" />
                    <button className="normal">Sign Up</button>
                </div>
            </section>

            <footer>
                <div className="col">
                    <img className="logo" src="/images/logo.png" alt="Logo" />
                    <h4>Contact</h4>
                    <p><strong>Address:</strong> 562 Wellington Road, Street 32, San Francisco</p>
                    <p><strong>Phone:</strong> +8 40470289 +7 89048098</p>
                    <p><strong>Hours:</strong> 10:00 - 18:00 Mon-Sat</p>
                    <div className="follow">
                        <h4>Follow Us</h4>
                        <div className="icon">
                            <i className="fab fa-facebook-f"></i>
                            <i className="fab fa-twitter"></i>
                            <i className="fab fa-instagram"></i>
                            <i className="fab fa-pinterest-p"></i>
                            <i className="fab fa-youtube"></i>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <h4>About</h4>
                    <a href="#">About Us</a>
                    <a href="#">Delivery Information</a>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms & Conditions</a>
                    <a href="#">Contact Us</a>
                </div>
                <div className="col">
                    <h4>My Account</h4>
                    <a href="#">Sign In</a>
                    <a href="#">View Cart</a>
                    <a href="#">My Wishlist</a>
                    <a href="#">Track My Order</a>
                    <a href="#">Help</a>
                </div>
                <div className="col install">
                    <h4>Install App</h4>
                    <p>From App Store Or Google Play</p>
                    <div className="row">
                        <img src="/images/pay/app.jpg" alt="App Store" />
                        <img src="/images/pay/play.jpg" alt="Google Play" />
                    </div>
                    <p>Secure Payment Gateway</p>
                    <img src="/images/pay/pay.png" alt="Payment Methods" />
                </div>
                <div className="copyright">
                    <p>©Copyright 2021 Tech - HTML CSS Ecommerce Template</p>
                </div>
            </footer>
        </div>
    );
};

export default Blog;