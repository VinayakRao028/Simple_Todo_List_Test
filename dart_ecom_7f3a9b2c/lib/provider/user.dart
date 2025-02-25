import 'dart:async';

import 'package:chat_app/models/cart_item.dart';
import 'package:chat_app/models/order.dart';
import 'package:chat_app/models/product.dart';
import 'package:chat_app/models/user.dart';
import 'package:chat_app/services/order.dart';
import 'package:chat_app/services/users.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:uuid/uuid.dart';

enum Status { uninitialized, authenticated, authenticating, unauthenticated }

class UserProvider with ChangeNotifier {
  final FirebaseAuth _auth;
  User? _user;
  Status _status = Status.uninitialized;
  final UserServices _userServices = UserServices();
  final OrderServices _orderServices = OrderServices();

  UserModel? _userModel;

  // Getters
  UserModel? get userModel => _userModel;
  Status get status => _status;
  User? get user => _user;

  // Public variables
  List<OrderModel> orders = [];

  UserProvider.initialize() : _auth = FirebaseAuth.instance {
    _auth.authStateChanges().listen(_onStateChanged);
  }

  Future<bool> signIn(String email, String password) async {
    try {
      _status = Status.authenticating;
      notifyListeners();
      UserCredential userCredential = await _auth.signInWithEmailAndPassword(
          email: email, password: password);
      _userModel = await _userServices.getUserById(userCredential.user!.uid);
      notifyListeners();
      return true;
    } catch (e) {
      _status = Status.unauthenticated;
      notifyListeners();
      print(e.toString());
      return false;
    }
  }

  Future<bool> signUp(String name, String email, String password) async {
    try {
      _status = Status.authenticating;
      notifyListeners();
      UserCredential userCredential = await _auth
          .createUserWithEmailAndPassword(email: email, password: password);
      print("CREATE USER");
      await _userServices.createUser({
        'name': name,
        'email': email,
        'uid': userCredential.user!.uid,
        'stripeId': ''
      });
      _userModel = await _userServices.getUserById(userCredential.user!.uid);
      notifyListeners();
      return true;
    } catch (e) {
      _status = Status.unauthenticated;
      notifyListeners();
      print(e.toString());
      return false;
    }
  }

  Future<void> signOut() async {
    await _auth.signOut();
    _status = Status.unauthenticated;
    notifyListeners();
  }

  Future<void> _onStateChanged(User? firebaseUser) async {
    if (firebaseUser == null) {
      _status = Status.unauthenticated;
    } else {
      _user = firebaseUser;
      _userModel = await _userServices.getUserById(firebaseUser.uid);
      _status = Status.authenticated;
    }
    notifyListeners();
  }

  Future<bool> addToCart({
    required ProductModel product,
    required String size,
    required String color,
  }) async {
    try {
      var uuid = const Uuid();
      String cartItemId = uuid.v4();
      List<CartItemModel> cart = _userModel?.cart ?? [];

      Map<String, dynamic> cartItem = {
        "id": cartItemId,
        "name": product.name,
        "image": product.picture,
        "productId": product.id,
        "price": product.price,
        "size": size,
        "color": color
      };

      CartItemModel item = CartItemModel.fromMap(cartItem);
      print("CART ITEMS ARE: ${cart.toString()}");
      await _userServices.addToCart(userId: _user!.uid, cartItem: item);
      return true;
    } catch (e) {
      print("THE ERROR ${e.toString()}");
      return false;
    }
  }

  Future<bool> removeFromCart({required CartItemModel cartItem}) async {
    print("THE PRODUCT IS: ${cartItem.toString()}");

    try {
      await _userServices.removeFromCart(userId: _user!.uid, cartItem: cartItem);
      return true;
    } catch (e) {
      print("THE ERROR ${e.toString()}");
      return false;
    }
  }

  Future<void> getOrders() async {
    orders = await _orderServices.getUserOrders(userId: _user!.uid);
    notifyListeners();
  }

  Future<void> reloadUserModel() async {
    _userModel = await _userServices.getUserById(user!.uid);
    notifyListeners();
  }
}