it('input fields should be filled correctly', () => {
    const search = { module: 'cs1010'};
    expect(navbar.find('#search-bar').length).toBe(1);

    const moduleInput = modules.find('#search-bar');
    moduleInput.value = search.module;
    expect(moduleInput.value).toBe('cs1010');

});