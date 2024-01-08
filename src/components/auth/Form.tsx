  const businessNumberCheckHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = { value: value.businessNumber };

    try {
      const res = await axios.post('/api/auth', data);
      const message =
        res.status === 200 && res.data.data[0].tax_type_cd === '01' ? '인증되었습니다.' : res.data.data[0].tax_type;
      return alert(message);
    } catch (error) {
      console.error(error);
    }
  };
              <button
                className="w-1/4 p-2 ml-2 rounded-md text-white bg-purple-500 hover:bg-purple-600"
                type="button"
                onClick={businessNumberCheckHandler}
              >
                인증
              </button>
