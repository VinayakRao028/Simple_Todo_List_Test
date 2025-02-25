import 'package:cloud_firestore/cloud_firestore.dart';

class OrderModel {
  static const String id = "id";
  static const String description = "description";
  static const String cart = "cart";
  static const String userId = "userId";
  static const String total = "total";
  static const String status = "status";
  static const String createdAt = "createdAt";

  final String _id;
  final String _description;
  final String _userId;
  final String _status;
  final int _createdAt;
  final int _total;

  // Public variable
  final List<dynamic> cart;

  OrderModel.fromSnapshot(DocumentSnapshot snapshot)
      : _id = snapshot.get(id) as String,
        _description = snapshot.get(description) as String,
        _total = snapshot.get(total) as int,
        _status = snapshot.get(status) as String,
        _userId = snapshot.get(userId) as String,
        _createdAt = snapshot.get(createdAt) as int,
        cart = snapshot.get(cart) as List<dynamic>;

  // Getters
  String get orderId => _id;
  String get orderDescription => _description;
  String get orderUserId => _userId;
  String get orderStatus => _status;
  int get orderTotal => _total;
  int get orderCreatedAt => _createdAt;
}