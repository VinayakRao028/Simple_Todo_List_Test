import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/foundation.dart';
import 'package:dart_ecom_7f3a9b2c/models/cart_item.dart';
import 'package:dart_ecom_7f3a9b2c/models/user.dart';

class UserServices {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final String _collection = "users";

  Future<void> createUser(Map<String, dynamic> data) async {
    try {
      await _firestore.collection(_collection).doc(data["uid"]).set(data);
      debugPrint("USER WAS CREATED");
    } catch (e) {
      debugPrint('ERROR: ${e.toString()}');
    }
  }

  Future<UserModel> getUserById(String id) async {
    final doc = await _firestore.collection(_collection).doc(id).get();
    debugPrint("==========id is $id=============");
    debugPrint("==========NAME is ${doc.data()?['name']}=============");

    return UserModel.fromSnapshot(doc);
  }

  Future<void> addToCart({required String userId, required CartItemModel cartItem}) async {
    await _firestore.collection(_collection).doc(userId).update({
      "cart": FieldValue.arrayUnion([cartItem.toMap()])
    });
  }

  Future<void> removeFromCart({required String userId, required CartItemModel cartItem}) async {
    await _firestore.collection(_collection).doc(userId).update({
      "cart": FieldValue.arrayRemove([cartItem.toMap()])
    });
  }
}