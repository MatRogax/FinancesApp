import 'package:flutter/services.dart';
import 'package:intl/intl.dart';

class CurrencyInputFormatter extends TextInputFormatter {
  final NumberFormat formatter = NumberFormat("#,##0.00", "pt_BR");

  @override
  TextEditingValue formatEditUpdate(
    TextEditingValue oldValue,
    TextEditingValue newValue,
  ) {
    if (newValue.text.isEmpty) {
      return newValue.copyWith(text: '');
    }

    String regexFormat = newValue.text.replaceAll(RegExp(r'[^\d]'), '');

    double value = double.parse(regexFormat) / 100;
    String formatted = formatter.format(value);

    int newCursorPosition = formatted.length;
    return TextEditingValue(
      text: formatted,
      selection: TextSelection.collapsed(offset: newCursorPosition),
    );
  }
}
