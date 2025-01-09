import 'package:flutter/material.dart';

class ContainerField extends StatefulWidget {
  final Size size;
  final Color backgroundField;
  final Widget child;
  const ContainerField({
    super.key,
    required this.size,
    required this.child,
    required this.backgroundField,
  });

  @override
  State<ContainerField> createState() => _ContainerFieldState();
}

class _ContainerFieldState extends State<ContainerField> {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: widget.size.width * 0.9,
      height: widget.size.height * 0.06,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(10),
        color: widget.backgroundField,
      ),
      child: widget.child,
    );
  }
}
