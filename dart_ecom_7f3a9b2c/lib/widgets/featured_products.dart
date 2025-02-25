import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:dart_ecom_7f3a9b2c/provider/product.dart';
import 'package:dart_ecom_7f3a9b2c/widgets/featured_card.dart';

class FeaturedProducts extends StatefulWidget {
  const FeaturedProducts({Key? key}) : super(key: key);

  @override
  _FeaturedProductsState createState() => _FeaturedProductsState();
}

class _FeaturedProductsState extends State<FeaturedProducts> {
  @override
  Widget build(BuildContext context) {
    final productProvider = Provider.of<ProductProvider>(context);

    return SizedBox(
      height: 230,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        itemCount: productProvider.products.length,
        itemBuilder: (context, index) {
          return FeaturedCard(
            product: productProvider.products[index],
          );
        },
      ),
    );
  }
}