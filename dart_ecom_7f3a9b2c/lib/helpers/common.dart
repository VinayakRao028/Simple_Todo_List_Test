import 'package:flutter/material.dart';

/// Changes the current screen to the specified widget.
///
/// This function uses [Navigator.push] to navigate to a new screen.
///
/// [context] is the build context of the current widget.
/// [widget] is the new widget to be displayed.
void changeScreen(BuildContext context, Widget widget) {
  Navigator.push(
    context,
    MaterialPageRoute(builder: (context) => widget),
  );
}

/// Replaces the current screen with the specified widget.
///
/// This function uses [Navigator.pushReplacement] to replace the current screen.
///
/// [context] is the build context of the current widget.
/// [widget] is the new widget to be displayed.
void changeScreenReplacement(BuildContext context, Widget widget) {
  Navigator.pushReplacement(
    context,
    MaterialPageRoute(builder: (context) => widget),
  );
}