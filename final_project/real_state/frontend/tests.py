from django.test import TestCase
import os
import pathlib
import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys


def file_uri(filename):
    return pathlib.Path(os.path.abspath(filename)).as_uri()

driver = webdriver.Chrome()

class WebpageTests(unittest.TestCase):

    def test_title(self):
        driver.get("http://127.0.0.1:8000/")
        self.assertEqual(driver.title, "Real State")

    def test_search_house_by_city(self):
        driver.get("http://127.0.0.1:8000/")
        driver.maximize_window()
        search = driver.find_element_by_id("search-content").send_keys('sao paulo')
        button = driver.find_element_by_id('search-button').click()
        result = len(driver.find_elements_by_class_name('card'))
        print('houses found: ', result )
        self.assertEqual(result, 1)
        driver.quit()

    # def test_search_house_containing(self):
    #     driver.get("http://127.0.0.1:8000/")
    #     driver.maximize_window()
    #     search = driver.find_element_by_id("search-content").send_keys('ao')
    #     button = driver.find_element_by_id('search-button').click()
    #     result = len(driver.find_elements_by_class_name('card'))
    #     self.assertEqual(result, 2)
    #     driver.quit()
        
        

        

    # def test_decrease(self):
    #     driver.get(file_uri("counter.html"))
    #     decrease = driver.find_element_by_id("decrease")
    #     decrease.click()
    #     self.assertEqual(driver.find_element_by_tag_name("h1").text, "-1")

    # def test_multiple_increase(self):
    #     driver.get(file_uri("counter.html"))
    #     increase = driver.find_element_by_id("increase")
    #     for i in range(3):
    #         increase.click()
    #     self.assertEqual(driver.find_element_by_tag_name("h1").text, "3")


if __name__ == "__main__":
    unittest.main()