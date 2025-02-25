#ifndef APPDELEGATE_H
#define APPDELEGATE_H

#include <QObject>
#include <QGuiApplication>

class AppDelegate : public QObject
{
    Q_OBJECT

public:
    explicit AppDelegate(QObject *parent = nullptr);
    virtual ~AppDelegate();

    void initialize(QGuiApplication *app);

private:
    // Add any private members or methods here
};

#endif // APPDELEGATE_H