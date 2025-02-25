import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:dart_ecom_7f3a9b2c/models/product.dart';

class ProductServices {
  final String collection = "products";
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  Future<List<ProductModel>> getProducts() async {
    final QuerySnapshot result = await _firestore.collection(collection).get();
    return result.docs.map((doc) => ProductModel.fromSnapshot(doc)).toList();
  }

  Future<List<ProductModel>> searchProducts({required String productName}) async {
    // Convert the first character to uppercase
    final String searchKey = productName[0].toUpperCase() + productName.substring(1);
    
    final QuerySnapshot result = await _firestore
        .collection(collection)
        .orderBy("name")
        .startAt([searchKey])
        .endAt([searchKey + '\uf8ff'])
        .get();

    return result.docs.map((doc) => ProductModel.fromSnapshot(doc)).toList();
  }
}