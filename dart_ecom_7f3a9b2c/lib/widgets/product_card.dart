import 'package:flutter/material.dart';
import 'package:transparent_image/transparent_image.dart';

import '../helpers/common.dart';
import '../helpers/style.dart';
import '../models/product.dart';
import '../screens/product_details.dart';
import '../widgets/custom_text.dart';
import 'loading.dart';

class ProductCard extends StatelessWidget {
  final ProductModel product;

  const ProductCard({Key? key, required this.product}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: GestureDetector(
        onTap: () {
          changeScreen(context, ProductDetails(product: product));
        },
        child: Container(
          decoration: BoxDecoration(
            color: white,
            borderRadius: BorderRadius.circular(20),
            boxShadow: [
              BoxShadow(
                color: Colors.grey[300]!,
                offset: const Offset(-2, -1),
                blurRadius: 5,
              ),
            ],
          ),
          child: Row(
            children: <Widget>[
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(10),
                  child: Stack(
                    children: <Widget>[
                      const Positioned.fill(
                        child: Align(
                          alignment: Alignment.center,
                          child: Loading(),
                        ),
                      ),
                      Center(
                        child: FadeInImage.memoryNetwork(
                          placeholder: kTransparentImage,
                          image: product.picture,
                          fit: BoxFit.cover,
                          height: 140,
                          width: 120,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: RichText(
                  text: TextSpan(
                    children: [
                      TextSpan(
                        text: '${product.name}\n',
                        style: const TextStyle(fontSize: 20),
                      ),
                      TextSpan(
                        text: 'by: ${product.brand}\n\n\n\n',
                        style: const TextStyle(fontSize: 16, color: Colors.grey),
                      ),
                      TextSpan(
                        text: '\$${product.price / 100}\t',
                        style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                      ),
                      TextSpan(
                        text: product.sale ? 'ON SALE ' : '',
                        style: const TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.w400,
                          color: Colors.red,
                        ),
                      ),
                    ],
                    style: const TextStyle(color: Colors.black),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _productImage(String picture) {
    if (picture.isEmpty) {
      return const SizedBox(
        child: CustomText(text: "No Image"),
      );
    } else {
      return Padding(
        padding: const EdgeInsets.all(8.0),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(10),
          child: Image.network(
            product.picture,
            height: 140,
            width: 120,
            fit: BoxFit.cover,
          ),
        ),
      );
    }
  }
}