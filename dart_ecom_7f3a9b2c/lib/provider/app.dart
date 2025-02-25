import 'package:flutter/foundation.dart';

class AppProvider with ChangeNotifier {
  bool _isLoading = false;

  bool get isLoading => _isLoading;

  void changeIsLoading() {
    _isLoading = !_isLoading;
    notifyListeners();
  }
}