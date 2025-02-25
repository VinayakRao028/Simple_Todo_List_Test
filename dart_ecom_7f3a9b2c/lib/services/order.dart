import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:dart_ecom_7f3a9b2c/models/cart_item.dart';
import 'package:dart_ecom_7f3a9b2c/models/order.dart';

class OrderServices {
  final String collection = "orders";
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  void createOrder({
    required String userId,
    required String id,
    required String description,
    required String status,
    required List<CartItemModel> cart,
    required int totalPrice,
  }) {
    final List<Map<String, dynamic>> convertedCart = cart.map((item) => item.toMap()).toList();

    _firestore.collection(collection).doc(id).set({
      "userId": userId,
      "id": id,
      "cart": convertedCart,
      "total": totalPrice,
      "createdAt": DateTime.now().millisecondsSinceEpoch,
      "description": description,
      "status": status
    });
  }

  Future<List<OrderModel>> getUserOrders({required String userId}) async {
    final QuerySnapshot result = await _firestore
        .collection(collection)
        .where("userId", isEqualTo: userId)
        .get();

    return result.docs.map((doc) => OrderModel.fromSnapshot(doc)).toList();
  }
}