import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class WidgetTextField extends StatefulWidget {
  final List<TextInputFormatter>? inputFormat;
  final TextInputType inputType;
  final String labeltext;
  final TextEditingController controllerText;
  // final double contentInputPadding;
  final Widget? prefixFieldIcon;
  const WidgetTextField({
    Key? key,
    this.inputFormat,
    this.prefixFieldIcon,
    required this.inputType,
    required this.controllerText,
    required this.labeltext,
    // required this.contentInputPadding,
  }) : super(key: key);

  @override
  _WidgetTextFieldState createState() => _WidgetTextFieldState();
}

class _WidgetTextFieldState extends State<WidgetTextField> {
  @override
  Widget build(BuildContext context) {
    return TextFormField(
      inputFormatters: widget.inputFormat,
      keyboardType: widget.inputType,
      controller: widget.controllerText,
      enabled: true,
      decoration: InputDecoration(
        prefixIcon: widget.prefixFieldIcon,
        labelText: widget.labeltext,
      ),
    );
  }
}
