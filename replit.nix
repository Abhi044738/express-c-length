{ pkgs }: {
  deps = [
    pkgs.nodejs-18_x   # Node.js 18 runtime
    pkgs.gcc            # GNU C Compiler
    pkgs.libgcc         # GCC support libraries
  ];
}
