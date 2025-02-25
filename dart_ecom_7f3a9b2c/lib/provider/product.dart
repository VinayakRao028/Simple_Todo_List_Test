import 'package:flutter/foundation.dart';
import '../models/product.dart';
import '../services/product.dart';

class ProductProvider with ChangeNotifier {
  final ProductServices _productServices = ProductServices();
  List<ProductModel> products = [];
  List<ProductModel> productsSearched = [];

  ProductProvider() {
    loadProducts();
  }

  Future<void> loadProducts() async {
    products = await _productServices.getProducts();
    notifyListeners();
  }

  Future<void> search({required String productName}) async {
    productsSearched = await _productServices.searchProducts(productName: productName);
    notifyListeners();
  }
}