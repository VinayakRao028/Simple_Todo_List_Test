import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:dart_ecom_7f3a9b2c/helpers/style.dart';

class Loading extends StatelessWidget {
  const Loading({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      color: white,
      child: const Center(
        child: SpinKitFadingCircle(
          color: black,
          size: 30,
        ),
      ),
    );
  }
}