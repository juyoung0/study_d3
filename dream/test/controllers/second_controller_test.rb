require 'test_helper'

class SecondControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get second_index_url
    assert_response :success
  end

end
