
# The code below is extracted from the ActiveSupport::SecureRandom module

def random_hex(n = nil)
  random_bytes(n).unpack("H*")[0]
end

def random_bytes(n = nil)
  n ||= 16

  unless defined? OpenSSL
    begin
      require 'openssl'
    rescue LoadError
    end
  end

  if defined? OpenSSL::Random
    return OpenSSL::Random.random_bytes(n)
  end

  if !defined?(@has_urandom) || @has_urandom
    flags = File::RDONLY
    flags |= File::NONBLOCK if defined? File::NONBLOCK
    flags |= File::NOCTTY if defined? File::NOCTTY
    flags |= File::NOFOLLOW if defined? File::NOFOLLOW
    begin
      File.open("/dev/urandom", flags) {|f|
        unless f.stat.chardev?
          raise Errno::ENOENT
        end
        @has_urandom = true
        ret = f.readpartial(n)
        if ret.length != n
          raise NotImplementedError, "Unexpected partial read from random device"
        end
        return ret
      }
    rescue Errno::ENOENT
      @has_urandom = false
    end
  end

  if !defined?(@has_win32)
    begin
      require 'Win32API'

      crypt_acquire_context = Win32API.new("advapi32", "CryptAcquireContext", 'PPPII', 'L')
      @crypt_gen_random = Win32API.new("advapi32", "CryptGenRandom", 'LIP', 'L')

      hProvStr = " " * 4
      prov_rsa_full = 1
      crypt_verifycontext = 0xF0000000

      if crypt_acquire_context.call(hProvStr, nil, nil, prov_rsa_full, crypt_verifycontext) == 0
        raise SystemCallError, "CryptAcquireContext failed: #{lastWin32ErrorMessage}"
      end
      @hProv, = hProvStr.unpack('L')

      @has_win32 = true
    rescue LoadError
      @has_win32 = false
    end
  end
  if @has_win32
    bytes = " " * n
    if @crypt_gen_random.call(@hProv, bytes.size, bytes) == 0
      raise SystemCallError, "CryptGenRandom failed: #{lastWin32ErrorMessage}"
    end
    return bytes
  end

  raise NotImplementedError, "No random device"
end
