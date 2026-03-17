import pty
import os
import sys

pid, fd = pty.fork()
if pid == 0:
    os.execvp("ssh", ["ssh", "-p", "443", "-o", "StrictHostKeyChecking=no", "-R0:localhost:8081", "a.pinggy.io"])
else:
    output = os.read(fd, 4096)
    sys.stdout.write(output.decode('utf-8', 'ignore'))
