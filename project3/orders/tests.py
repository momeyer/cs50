from django.test import TestCase
from .models import Pizza

# Create your tests here.


class ModelsTestCase(TestCase):

    def setUp(self):
        # base
        regular = "REGULAR"
        sicilian = "SICILIAN"
        

        # toppings
        cheese = "CHEESE"
        one = "ONE TOPPING"
        two = "TWO TOPPINGS"
        three = "THREE TOPPINGS"
        special = "SPECIAL"
        # size
        small = "SMALL"
        large = "LARGE"

        regular_cheese_small = Pizza.objects.create(base=regular, toppings=cheese, size=small)
        regular_cheese_large = Pizza.objects.create(base=regular, toppings=cheese, size=large)
        regular_one_small = Pizza.objects.create(base=regular, toppings=one, size=small)
        regular_one_large = Pizza.objects.create(base=regular, toppings=one, size=large)
        regular_two_small = Pizza.objects.create(base=regular, toppings=two, size=small)
        regular_two_large = Pizza.objects.create(base=regular, toppings=two, size=large)
        regular_three_small = Pizza.objects.create(base=regular, toppings=three, size=small)
        regular_three_large = Pizza.objects.create(base=regular, toppings=three, size=large)
        regular_special_small = Pizza.objects.create(base=regular, toppings=special, size=small)
        regular_special_large = Pizza.objects.create(base=regular, toppings=special, size=large)
    
        sicilian_cheese_small = Pizza.objects.create(base=sicilian, toppings=cheese, size=small)
        sicilian_cheese_large = Pizza.objects.create(base=sicilian, toppings=cheese, size=large)
        sicilian_one_small = Pizza.objects.create(base=sicilian, toppings=one, size=small)
        sicilian_one_large = Pizza.objects.create(base=sicilian, toppings=one, size=large)
        sicilian_two_small = Pizza.objects.create(base=sicilian, toppings=two, size=small)
        sicilian_two_large = Pizza.objects.create(base=sicilian, toppings=two, size=large)
        sicilian_three_small = Pizza.objects.create(base=sicilian, toppings=three, size=small)
        sicilian_three_large = Pizza.objects.create(base=sicilian, toppings=three, size=large)
        sicilian_special_small = Pizza.objects.create(base=sicilian, toppings=special, size=small)
        sicilian_special_large = Pizza.objects.create(base=sicilian, toppings=special, size=large)

    def test_pizza_count(self):
        a = Pizza.objects.all()
        self.assertEqual(a.count(), 20)

    def test_regular_pizza_count(self):
        a = Pizza.objects.filter(base='REGULAR')
        self.assertEqual(a.count(), 10)

    def test_sicilian_pizza_count(self):
        a = Pizza.objects.filter(base='SICILIAN')
        self.assertEqual(a.count(), 10)

    def test_add_invalid_combinations(self):
        a = Pizza.objects.create(base='invalid', toppings='four', size='medium')
        self.assertFalse(a)

        # def test_valid_flight(self):
        #     a1 = Airport.objects.get(code="AAA")
        #     a2 = Airport.objects.get(code="BBB")
        #     f = Flight.objects.get(origin=a1, destination=a2, duration=100)
        #     self.assertTrue(f.is_valid_flight())

        # def test_invalid_flight_destination(self):
        #     a1 = Airport.objects.get(code="AAA")
        #     f = Flight.objects.get(origin=a1, destination=a1)
        #     self.assertFalse(f.is_valid_flight())
